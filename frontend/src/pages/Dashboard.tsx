import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { materialsService, generateService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const { data: materials, refetch, isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const response = await materialsService.getAll();
      return response.data.materials;
    }
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      toast.error('Please select a file and enter a title');
      return;
    }
    setUploading(true);
    try {
      await materialsService.upload(file, title);
      toast.success('File uploaded successfully!');
      setFile(null);
      setTitle('');
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleGenerate = async (materialId: string, type: string) => {
    try {
      if (type === 'notes') await generateService.notes(materialId);
      else if (type === 'flashcards') await generateService.flashcards(materialId);
      else if (type === 'quiz') await generateService.quiz(materialId);
      else if (type === 'mindmap') await generateService.mindmap(materialId);
      
      toast.success(`${type} generated!`);
      refetch();
    } catch (error: any) {
      toast.error(`Failed to generate ${type}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New Material</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., Chapter 5: Biology Notes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select File (PDF or TXT)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.txt"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Materials</h2>
          {isLoading ? (
            <p className="text-gray-600">Loading materials...</p>
          ) : materials && materials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material: any) => (
                <div key={material._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{new Date(material.createdAt).toLocaleDateString()}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      onClick={() => handleGenerate(material._id, 'notes')}
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm font-medium hover:bg-blue-200"
                    >
                      📝 Notes
                    </button>
                    <button
                      onClick={() => handleGenerate(material._id, 'flashcards')}
                      className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm font-medium hover:bg-green-200"
                    >
                      🎴 Cards
                    </button>
                    <button
                      onClick={() => handleGenerate(material._id, 'quiz')}
                      className="bg-purple-100 text-purple-700 px-3 py-2 rounded text-sm font-medium hover:bg-purple-200"
                    >
                      📋 Quiz
                    </button>
                    <button
                      onClick={() => handleGenerate(material._id, 'mindmap')}
                      className="bg-orange-100 text-orange-700 px-3 py-2 rounded text-sm font-medium hover:bg-orange-200"
                    >
                      🧠 Mind Map
                    </button>
                  </div>

                  <button
                    onClick={() => navigate(`/material/${material._id}`)}
                    className="w-full bg-gray-200 text-gray-800 px-3 py-2 rounded font-medium hover:bg-gray-300"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No materials yet. Upload one to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}