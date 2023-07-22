from PIL import Image
import os

def compress_resize_crop_image(input_path, output_path, target_size=(500, 500)):
    try:
        # Open the image
        image = Image.open(input_path)

        # Compress the image by saving with a low quality value (adjust as needed)
        image.save(output_path, optimize=True, quality=70)

        # Resize the image while maintaining the aspect ratio
        image.thumbnail(target_size, Image.ANTIALIAS)

        # Calculate the offset to crop the image and center it
        offset_x = max((target_size[0] - image.size[0]) // 2, 0)
        offset_y = max((target_size[1] - image.size[1]) // 2, 0)

        # Crop the image to the target size
        cropped_image = Image.new('RGBA', target_size, (255, 255, 255, 0))
        cropped_image.paste(image, (offset_x, offset_y))

        # Save the final cropped and resized image
        cropped_image.save(output_path)

        print(f"Image successfully compressed, resized, and cropped: {output_path}")

    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # Replace 'input.png' with the path to your PNG image file.
    input_image_path = "input.png"

    # Replace 'output.png' with the desired output path for the processed image.
    output_image_path = "output.png"

    # Replace (500, 500) with the desired target size (width, height) in pixels.
    target_size = (500, 500)

    # Call the function with the specified input and output paths and target size.
    compress_resize_crop_image(input_image_path, output_image_path, target_size)
