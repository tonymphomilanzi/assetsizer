function loadImage(sourceFile: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(sourceFile);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(
        new Error(`Failed to load image: ${sourceFile.name}`)
      );
    };
    image.src = objectUrl;
  });
}

export async function resizeImage(
  sourceFile: File,
  targetWidth: number,
  targetHeight: number
): Promise<Blob> {
  const image = await loadImage(sourceFile);

  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  const targetAspectRatio = targetWidth / targetHeight;
  const sourceAspectRatio = naturalWidth / naturalHeight;

  // Center crop: no stretching, no letterboxing.
  let cropWidth = naturalWidth;
  let cropHeight = naturalHeight;

  if (sourceAspectRatio > targetAspectRatio) {
    // Source is wider than needed: crop left/right edges equally.
    cropWidth = naturalHeight * targetAspectRatio;
  } else if (sourceAspectRatio < targetAspectRatio) {
    // Source is taller than needed: crop top/bottom edges equally.
    cropHeight = naturalWidth / targetAspectRatio;
  }

  const cropX = (naturalWidth - cropWidth) / 2;
  const cropY = (naturalHeight - cropHeight) / 2;

  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not create a 2D rendering context");
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );
    return canvas.convertToBlob({ type: "image/png" });
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not create a 2D rendering context");
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    targetWidth,
    targetHeight
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not encode resized image as PNG"));
      }
    }, "image/png");
  });
}
