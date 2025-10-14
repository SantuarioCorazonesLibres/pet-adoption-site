import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Check,
  Loader2,
  X,
  Search,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

interface UploadedImage {
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

interface SelectedFile {
  file: File;
  customName: string;
}

const ImageManager = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [imageToDelete, setImageToDelete] = useState<UploadedImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar imágenes al montar el componente
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('Images')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const imagesWithUrls = data.map(file => {
        const { data: urlData } = supabase.storage
          .from('Images')
          .getPublicUrl(file.name);

        return {
          name: file.name,
          url: urlData.publicUrl,
          size: file.metadata?.size || 0,
          uploadedAt: new Date(file.created_at || new Date())
        };
      });

      setImages(imagesWithUrls);
    //   console.log('Imágenes cargadas:', imagesWithUrls); // Para debug
    } catch (error: any) {
    //   console.error('Error detallado:', error); // Para debug
      toast.error("Error al cargar imágenes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isImage) {
        toast.error(`${file.name} no es una imagen válida`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });

    const filesWithNames = validFiles.map(file => ({
      file,
      customName: file.name.split('.')[0] // Nombre sin extensión
    }));

    setSelectedFiles(filesWithNames);
  };

  const updateFileName = (index: number, newName: string) => {
    setSelectedFiles(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, customName: newName } : item
      )
    );
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Selecciona al menos una imagen");
      return;
    }

    // Validar que todos tengan nombre
    const hasEmptyNames = selectedFiles.some(item => !item.customName.trim());
    if (hasEmptyNames) {
      toast.error("Todas las imágenes deben tener un nombre");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const totalFiles = selectedFiles.length;
      let uploadedCount = 0;

      for (const item of selectedFiles) {
        const fileExt = item.file.name.split('.').pop();
        const cleanName = item.customName.trim().replace(/[^a-zA-Z0-9-_\s]/g, '_');
        const fileName = `${cleanName}.${fileExt}`;

        const { error } = await supabase.storage
          .from('Images')
          .upload(fileName, item.file, {
            cacheControl: '3600',
            upsert: true // Sobrescribir si existe
          });

        if (error) throw error;

        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
      }

      toast.success(`${uploadedCount} imagen(es) subida(s) correctamente`);
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadImages();
    } catch (error: any) {
      toast.error("Error al subir imagen: " + error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (image: UploadedImage) => {
    setImageToDelete(image);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;

    setDeleting(true);
    try {
      const { error } = await supabase.storage
        .from('Images')
        .remove([imageToDelete.name]);

      if (error) throw error;

      toast.success("Imagen eliminada correctamente");
      await loadImages();
    } catch (error: any) {
      toast.error("Error al eliminar imagen: " + error.message);
    } finally {
      setDeleting(false);
      setImageToDelete(null);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast.success("URL copiada al portapapeles");
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      toast.error("Error al copiar URL");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    if (selectedFiles.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredImages = images.filter(img =>
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Card de subida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Upload className="h-5 w-5" />
            Subir Imágenes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input de archivos */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">Seleccionar imágenes</Label>
            <Input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={uploading}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Formatos: JPG, PNG, GIF, WebP. Tamaño máximo: 5MB por imagen.
            </p>
          </div>

          {/* Archivos seleccionados con nombres personalizables */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Archivos seleccionados ({selectedFiles.length})</Label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedFiles.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <ImageIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-muted-foreground truncate">
                            Original: {item.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(item.file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSelectedFile(index)}
                        disabled={uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`name-${index}`} className="text-xs">
                        Nombre para guardar:
                      </Label>
                      <Input
                        id={`name-${index}`}
                        value={item.customName}
                        onChange={(e) => updateFileName(index, e.target.value)}
                        placeholder="Nombre de la imagen..."
                        disabled={uploading}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Barra de progreso */}
          {uploading && (
            <div className="space-y-2">
              <Label>Subiendo... {uploadProgress}%</Label>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Botón de subir */}
          <Button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Subir {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Card de galería */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <ImageIcon className="h-5 w-5" />
              Galería ({filteredImages.length})
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar imágenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{searchTerm ? "No se encontraron imágenes" : "No hay imágenes. Sube la primera."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <Card key={image.name} className="overflow-hidden group">
                  <div className="relative aspect-square bg-muted">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Error cargando imagen:', image.url);
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EError%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard(image.url)}
                      >
                        {copiedUrl === image.url ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        asChild
                      >
                        <a href={image.url} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDelete(image)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs font-medium truncate" title={image.name}>
                      {image.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(image.size)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AlertDialog para confirmar eliminación */}
      <AlertDialog open={!!imageToDelete} onOpenChange={() => setImageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la imagen{" "}
              <span className="font-semibold">{imageToDelete?.name}</span> del almacenamiento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImageManager;