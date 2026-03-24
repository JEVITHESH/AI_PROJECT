import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { ArrowLeft, Plus, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const MAX_FILE_SIZE = 500 * 1024; // 500KB

export default function ManageGallery() {
    const { galleryImages, setGalleryImages } = useData();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [caption, setCaption] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            toast.error("File size too large. Max 500KB permitted.");
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file (JPG, PNG)");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreviewUrl(result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!previewUrl) {
            toast.error("Please upload an image first");
            return;
        }

        const newImage = {
            id: `g${Date.now()}`,
            src: previewUrl,
            caption: caption
        };
        setGalleryImages([newImage, ...galleryImages]);
        resetForm();
        toast.success("Photo added to gallery");
    };

    const resetForm = () => {
        setIsAdding(false);
        setCaption('');
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure?')) {
            setGalleryImages(galleryImages.filter(img => img.id !== id));
            toast.success("Photo deleted");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/dashboard')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Manage Gallery</h2>
            </div>

            {!isAdding ? (
                <div className="space-y-4">
                    <Button onClick={() => setIsAdding(true)} className="w-full gap-2">
                        <Plus className="h-4 w-4" /> Add New Photo
                    </Button>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img) => (
                            <Card key={img.id} className="overflow-hidden group relative bg-background border-border/60">
                                <div className="aspect-square relative">
                                    <img
                                        src={img.src}
                                        alt={img.caption}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id)} className="shadow-lg">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center text-xs text-white truncate px-4">
                                        {img.caption}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Add Photo</CardTitle>
                        <CardDescription>Upload an image from your device.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Drag and Drop Zone */}
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />

                                {previewUrl ? (
                                    <div className="relative inline-block group">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="max-h-64 rounded-lg shadow-md"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewUrl(null);
                                                if (fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 py-4">
                                        <div className="p-4 bg-primary/10 rounded-full">
                                            <Upload className="h-8 w-8 text-primary" />
                                        </div>
                                        <p className="text-lg font-medium text-foreground">Click to upload or drag and drop</p>
                                        <p className="text-sm text-muted-foreground">SVG, PNG, JPG (max 500KB)</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Caption</Label>
                                <Input
                                    required
                                    placeholder="Enter image caption..."
                                    value={caption}
                                    onChange={e => setCaption(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1" disabled={!previewUrl}>
                                    Save Photo
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
