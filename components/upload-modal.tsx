import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function UploadModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const filename = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('music')
      .upload(filename, file);

    if (uploadError) return alert('上传失败');

    const { data } = supabase.storage.from('music').getPublicUrl(filename);
    const url = data.publicUrl;

    const { error: insertError } = await supabase
      .from('songs')
      .insert([{ title, artist, description, url }]);

    if (insertError) return alert('插入数据库失败');

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">上传歌曲</h2>
        <input type="text" placeholder="歌名" className="w-full border p-2" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="歌手" className="w-full border p-2" onChange={(e) => setArtist(e.target.value)} />
        <textarea placeholder="描述" className="w-full border p-2" onChange={(e) => setDescription(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500">取消</button>
          <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-1 rounded">上传</button>
        </div>
      </div>
    </div>
  );
}
