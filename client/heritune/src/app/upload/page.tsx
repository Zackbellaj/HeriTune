'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileAudio, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', origin: '', tradition: '', ritualContext: '', therapeuticFunction: ''
  });
  const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({ audio: null, image: null });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'audio' | 'image') => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!files.audio) return alert("Fichier audio requis !");
    setLoading(true);
    const data = new FormData();
    (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => data.append(key, formData[key]));
    data.append('audio', files.audio);
    if (files.image) data.append('image', files.image);

    try {
      await api.post('/tracks', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      router.push('/');
    } catch (err) { alert("Erreur upload"); } finally { setLoading(false); }
  };

  const InputStyle = "w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none transition font-medium text-stone-700 placeholder-stone-400";
  const LabelStyle = "block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="pt-28 pb-20 max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-stone-200/50">
        
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Partager un Héritage</h1>
            <p className="text-stone-500">Contribuez à l'archive mondiale en ajoutant un chant traditionnel.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: L'essentiel */}
          <div className="space-y-5">
            <div>
              <label className={LabelStyle}>Titre du Chant</label>
              <input type="text" required className={InputStyle} placeholder="ex: Chant des Guérisseurs"
                onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                <label className={LabelStyle}>Origine (Pays/Région)</label>
                <input type="text" required className={InputStyle} placeholder="ex: Sénégal"
                  onChange={e => setFormData({...formData, origin: e.target.value})} />
               </div>
               <div>
                <label className={LabelStyle}>Tradition</label>
                <input type="text" required className={InputStyle} placeholder="ex: Mandingue"
                  onChange={e => setFormData({...formData, tradition: e.target.value})} />
               </div>
            </div>
          </div>

          <div className="h-px bg-stone-100"></div>

          {/* Section 2: Contexte Anthropologique */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div>
                <label className={LabelStyle}>Contexte Rituel</label>
                <input type="text" className={InputStyle} placeholder="ex: Mariage, Moisson"
                  onChange={e => setFormData({...formData, ritualContext: e.target.value})} />
             </div>
             <div>
                <label className={LabelStyle}>Fonction Thérapeutique</label>
                <input type="text" className={InputStyle} placeholder="ex: Apaisement, Transe"
                  onChange={e => setFormData({...formData, therapeuticFunction: e.target.value})} />
             </div>
          </div>

          {/* Section 3: Fichiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className={`relative flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-2xl cursor-pointer transition overflow-hidden group ${files.audio ? 'border-green-500 bg-green-50' : 'border-stone-300 hover:border-yellow-500 hover:bg-stone-50'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-stone-500 group-hover:text-yellow-600 transition-colors">
                    {files.audio ? <FileAudio size={40} className="text-green-600 mb-2"/> : <UploadCloud size={40} className="mb-2"/>}
                    <p className="text-sm font-semibold">{files.audio ? files.audio.name : "Fichier Audio (MP3)"}</p>
                    <p className="text-xs opacity-60 mt-1">{files.audio ? "Prêt à l'envoi" : "Glisser ou cliquer"}</p>
                </div>
                <input type="file" accept="audio/*" required className="hidden" onChange={e => handleFileChange(e, 'audio')} />
            </label>

            <label className={`relative flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-2xl cursor-pointer transition overflow-hidden group ${files.image ? 'border-green-500 bg-green-50' : 'border-stone-300 hover:border-yellow-500 hover:bg-stone-50'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-stone-500 group-hover:text-yellow-600 transition-colors">
                    {files.image ? <ImageIcon size={40} className="text-green-600 mb-2"/> : <ImageIcon size={40} className="mb-2"/>}
                    <p className="text-sm font-semibold">{files.image ? files.image.name : "Couverture (Optionnel)"}</p>
                    <p className="text-xs opacity-60 mt-1">JPG, PNG</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, 'image')} />
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin"/> : 'Publier le Chant'}
          </button>
        </form>
      </div>
    </div>
  );
}