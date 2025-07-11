import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Sparkles, Save, Download, Eye } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Resume, InsertResume } from '@shared/schema';

export default function ResumeBuilder() {
  const params = useParams();
  const [location] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const resumeId = params.id;
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const templateId = urlParams.get('template') || 'modern-minimal';

  const [resume, setResume] = useState<Partial<InsertResume>>({
    title: 'My Resume',
    templateId,
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Load existing resume if editing
  const { data: existingResume } = useQuery<Resume>({
    queryKey: ['/api/resumes', resumeId],
    enabled: !!resumeId,
  });

  useEffect(() => {
    if (existingResume) {
      setResume(existingResume);
    }
  }, [existingResume]);

  // Save resume mutation
  const saveResumeMutation = useMutation({
    mutationFn: async (data: Partial<InsertResume>) => {
      if (resumeId) {
        return apiRequest(`/api/resumes/${resumeId}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        });
      } else {
        return apiRequest('/api/resumes', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Resume saved successfully!',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/resumes'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save resume',
      });
    },
  });

  // AI generation functions
  const generateContent = async (type: 'summary' | 'experience' | 'skills', context?: any) => {
    setIsGenerating(true);
    try {
      const response = await apiRequest('/api/ai/generate', {
        method: 'POST',
        body: JSON.stringify({
          type,
          jobTitle: context?.jobTitle || '',
          industry: context?.industry || '',
          experience: context?.experience || '',
          currentContent: context?.currentContent || '',
        }),
      });
      
      return response.content;
    } catch (error: any) {
      toast({
        title: 'AI Generation Failed',
        description: error.message || 'Failed to generate content',
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSummary = async () => {
    const content = await generateContent('summary', {
      jobTitle: 'Professional',
      industry: 'Technology',
      experience: 'Mid-level',
    });
    
    if (content) {
      setResume(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo!,
          summary: content,
        },
      }));
    }
  };

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience!,
        {
          id: Math.random().toString(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          location: '',
          description: '',
        },
      ],
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [
        ...prev.education!,
        {
          id: Math.random().toString(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          gpa: '',
        },
      ],
    }));
  };

  const addSkillCategory = () => {
    setResume(prev => ({
      ...prev,
      skills: [
        ...prev.skills!,
        {
          id: Math.random().toString(),
          category: 'Technical Skills',
          items: [],
        },
      ],
    }));
  };

  const handleSave = () => {
    saveResumeMutation.mutate(resume);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <Input
                value={resume.title || ''}
                onChange={(e) => setResume(prev => ({ ...prev, title: e.target.value }))}
                className="text-xl font-bold bg-transparent border-none p-0 h-auto focus:ring-0"
                placeholder="Resume Title"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saveResumeMutation.isPending}
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {saveResumeMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resume.personalInfo?.fullName || ''}
                          onChange={(e) => setResume(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo!, fullName: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resume.personalInfo?.email || ''}
                          onChange={(e) => setResume(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo!, email: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resume.personalInfo?.phone || ''}
                          onChange={(e) => setResume(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo!, phone: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resume.personalInfo?.location || ''}
                          onChange={(e) => setResume(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo!, location: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateSummary}
                          disabled={isGenerating}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          {isGenerating ? 'Generating...' : 'AI Generate'}
                        </Button>
                      </div>
                      <Textarea
                        id="summary"
                        value={resume.personalInfo?.summary || ''}
                        onChange={(e) => setResume(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo!, summary: e.target.value }
                        }))}
                        rows={4}
                        placeholder="Write a compelling professional summary..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Work Experience</CardTitle>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resume.experience?.map((exp, index) => (
                      <Card key={exp.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                              placeholder="Job Title"
                              value={exp.position}
                              onChange={(e) => {
                                const newExp = [...resume.experience!];
                                newExp[index].position = e.target.value;
                                setResume(prev => ({ ...prev, experience: newExp }));
                              }}
                            />
                            <Input
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = [...resume.experience!];
                                newExp[index].company = e.target.value;
                                setResume(prev => ({ ...prev, experience: newExp }));
                              }}
                            />
                          </div>
                          <Textarea
                            placeholder="Job description and achievements..."
                            value={exp.description}
                            onChange={(e) => {
                              const newExp = [...resume.experience!];
                              newExp[index].description = e.target.value;
                              setResume(prev => ({ ...prev, experience: newExp }));
                            }}
                            rows={3}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Education</CardTitle>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resume.education?.map((edu, index) => (
                      <Card key={edu.id} className="border-l-4 border-l-green-500">
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Institution"
                              value={edu.institution}
                              onChange={(e) => {
                                const newEdu = [...resume.education!];
                                newEdu[index].institution = e.target.value;
                                setResume(prev => ({ ...prev, education: newEdu }));
                              }}
                            />
                            <Input
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = [...resume.education!];
                                newEdu[index].degree = e.target.value;
                                setResume(prev => ({ ...prev, education: newEdu }));
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Skills</CardTitle>
                      <Button onClick={addSkillCategory} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resume.skills?.map((skillCategory, index) => (
                      <Card key={skillCategory.id} className="border-l-4 border-l-purple-500">
                        <CardContent className="pt-4">
                          <Input
                            placeholder="Category (e.g., Technical Skills)"
                            value={skillCategory.category}
                            onChange={(e) => {
                              const newSkills = [...resume.skills!];
                              newSkills[index].category = e.target.value;
                              setResume(prev => ({ ...prev, skills: newSkills }));
                            }}
                            className="mb-3"
                          />
                          <div className="flex flex-wrap gap-2">
                            {skillCategory.items.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>
                  Live preview of your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="resume-preview bg-white p-6 rounded border min-h-[600px]">
                  {/* Resume Header */}
                  <div className="resume-header">
                    <h1 className="resume-name">
                      {resume.personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <div className="resume-contact">
                      {resume.personalInfo?.email} • {resume.personalInfo?.phone} • {resume.personalInfo?.location}
                    </div>
                  </div>

                  {/* Summary */}
                  {resume.personalInfo?.summary && (
                    <div className="resume-section">
                      <h2 className="resume-section-title">Professional Summary</h2>
                      <p className="resume-description">{resume.personalInfo.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resume.experience && resume.experience.length > 0 && (
                    <div className="resume-section">
                      <h2 className="resume-section-title">Work Experience</h2>
                      {resume.experience.map((exp) => (
                        <div key={exp.id} className="resume-item">
                          <div className="resume-item-header">
                            <div>
                              <h3 className="resume-item-title">{exp.position}</h3>
                              <p className="resume-item-subtitle">{exp.company}</p>
                            </div>
                          </div>
                          <p className="resume-description">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {resume.education && resume.education.length > 0 && (
                    <div className="resume-section">
                      <h2 className="resume-section-title">Education</h2>
                      {resume.education.map((edu) => (
                        <div key={edu.id} className="resume-item">
                          <div className="resume-item-header">
                            <div>
                              <h3 className="resume-item-title">{edu.degree}</h3>
                              <p className="resume-item-subtitle">{edu.institution}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {resume.skills && resume.skills.length > 0 && (
                    <div className="resume-section">
                      <h2 className="resume-section-title">Skills</h2>
                      {resume.skills.map((skillCategory) => (
                        <div key={skillCategory.id} className="mb-2">
                          <strong>{skillCategory.category}:</strong>{' '}
                          {skillCategory.items.join(', ')}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}