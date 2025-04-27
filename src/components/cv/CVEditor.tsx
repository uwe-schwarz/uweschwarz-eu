import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Content } from '@/content/content';

interface CVEditorProps {
  data: Content;
  onChange: (data: Content) => void;
  language: 'en' | 'de';
}

const CVEditor: React.FC<CVEditorProps> = ({ data, onChange, language }) => {
  // Helper function to convert numbers to strings for inputs
  const toStr = (num: number) => num.toString();
  // Helper function to convert strings back to numbers
  const toNum = (str: string) => parseInt(str, 10);

  const handleChange = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const handleSkillChange = (category: string, index: number, field: string, value: any) => {
    const newData = { ...data };
    newData.skills[category][index][field] = value;
    onChange(newData);
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
    const newData = { ...data };
    newData.experience[index][field] = value;
    onChange(newData);
  };

  const handleEducationChange = (index: number, field: string, value: any) => {
    const newData = { ...data };
    newData.education[index][field] = value;
    onChange(newData);
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Convert numbers to strings for all number inputs */}
      <Input
        value={toStr(data.skills.frontend[0].level)}
        onChange={(e) => handleSkillChange('frontend', 0, 'level', toNum(e.target.value))}
      />
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Editor</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {language === 'en' 
            ? 'Edit your CV data below. Changes are saved automatically to the URL.'
            : 'Bearbeiten Sie Ihre Lebenslaufdaten unten. Änderungen werden automatisch in der URL gespeichert.'}
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input 
                  value={data.personal.name} 
                  onChange={(e) => handleChange('personal.name', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title (EN)</label>
                <Input 
                  value={data.personal.title.en} 
                  onChange={(e) => handleChange('personal.title.en', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title (DE)</label>
                <Input 
                  value={data.personal.title.de} 
                  onChange={(e) => handleChange('personal.title.de', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  value={data.personal.email} 
                  onChange={(e) => handleChange('personal.email', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input 
                  value={data.personal.phone} 
                  onChange={(e) => handleChange('personal.phone', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input 
                  value={data.personal.location} 
                  onChange={(e) => handleChange('personal.location', e.target.value)} 
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Summary</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">English</label>
                <textarea 
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows={4}
                  value={data.summary.en} 
                  onChange={(e) => handleChange('summary.en', e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">German</label>
                <textarea 
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows={4}
                  value={data.summary.de} 
                  onChange={(e) => handleChange('summary.de', e.target.value)} 
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 p-4 border rounded-md dark:border-gray-700">
                <h4 className="font-medium mb-2">Position {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <Input 
                      value={exp.company} 
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Position (EN)</label>
                    <Input 
                      value={exp.position.en} 
                      onChange={(e) => handleExperienceChange(index, 'position', {...exp.position, en: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Position (DE)</label>
                    <Input 
                      value={exp.position.de} 
                      onChange={(e) => handleExperienceChange(index, 'position', {...exp.position, de: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <Input 
                      value={exp.startDate} 
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <Input 
                      value={exp.endDate} 
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description (EN)</label>
                    <textarea 
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      rows={3}
                      value={exp.description.en} 
                      onChange={(e) => handleExperienceChange(index, 'description', {...exp.description, en: e.target.value})} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description (DE)</label>
                    <textarea 
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      rows={3}
                      value={exp.description.de} 
                      onChange={(e) => handleExperienceChange(index, 'description', {...exp.description, de: e.target.value})} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-6 p-4 border rounded-md dark:border-gray-700">
                <h4 className="font-medium mb-2">Education {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Institution</label>
                    <Input 
                      value={edu.institution} 
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Degree (EN)</label>
                    <Input 
                      value={edu.degree.en} 
                      onChange={(e) => handleEducationChange(index, 'degree', {...edu.degree, en: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Degree (DE)</label>
                    <Input 
                      value={edu.degree.de} 
                      onChange={(e) => handleEducationChange(index, 'degree', {...edu.degree, de: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <Input 
                      value={edu.startDate} 
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <Input 
                      value={edu.endDate} 
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Skills</h3>
            <div className="space-y-6">
              {Object.entries(data.skills).map(([category, skills]) => (
                <div key={category} className="mb-4">
                  <h4 className="font-medium mb-2 capitalize">{category}</h4>
                  <div className="space-y-3">
                    {Array.isArray(skills) && skills.map((skill, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 border rounded-md dark:border-gray-700">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <Input 
                            value={skill.name} 
                            onChange={(e) => handleSkillChange(category, index, 'name', e.target.value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Level (1-5)</label>
                          <Input 
                            type="number" 
                            min="1" 
                            max="5" 
                            value={toStr(skill.level)} 
                            onChange={(e) => handleSkillChange(category, index, 'level', toNum(e.target.value))} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Languages</h3>
            <div className="space-y-3">
              {data.languages.map((lang, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 border rounded-md dark:border-gray-700">
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <Input 
                      value={lang.language} 
                      onChange={(e) => {
                        const newData = {...data};
                        newData.languages[index].language = e.target.value;
                        onChange(newData);
                      }} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Proficiency (EN)</label>
                    <Input 
                      value={lang.proficiency.en} 
                      onChange={(e) => {
                        const newData = {...data};
                        newData.languages[index].proficiency.en = e.target.value;
                        onChange(newData);
                      }} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Proficiency (DE)</label>
                    <Input 
                      value={lang.proficiency.de} 
                      onChange={(e) => {
                        const newData = {...data};
                        newData.languages[index].proficiency.de = e.target.value;
                        onChange(newData);
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;
