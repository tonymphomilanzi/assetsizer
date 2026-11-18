import JSZip from "jszip";

export async function buildZip(
  assets: Array<{
    folderName: string;
    filename: string;
    blob: Blob;
  }>
): Promise<Blob> {
  const zip = new JSZip();
  for (const asset of assets) {
    zip.file(`${asset.folderName}/${asset.filename}`, asset.blob);
  }
  return zip.generateAsync({ type: "blob" });
}
