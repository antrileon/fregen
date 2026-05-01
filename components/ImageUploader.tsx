'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function ImageUploader({ onUpload, assetType, entityId }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${assetType}_${entityId}_${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error } = await supabase.storage.from('media').upload(filePath, file);
    if (error) {
      console.error('Error subiendo:', error);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
    onUpload(publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading && <span className="ml-2 text-sm">Subiendo...</span>}
    </div>
  );
}