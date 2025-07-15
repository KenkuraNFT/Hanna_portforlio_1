from PIL import Image
import os

# 入力フォルダと出力フォルダのパス
input_folder = "Gallery"
output_folder = "Gallery_webp"

# 入力フォルダ内のすべてのファイルを処理
for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.jpg', '.jpeg')):
        # 入力ファイルのフルパス
        input_path = os.path.join(input_folder, filename)
        # 出力ファイルの名前（拡張子を.webpに変更）
        output_filename = os.path.splitext(filename)[0] + '.webp'
        output_path = os.path.join(output_folder, output_filename)
        
        try:
            # 画像を開いてWebP形式に変換
            with Image.open(input_path) as img:
                img.save(output_path, 'WEBP', quality=80)
            print(f"Converted: {filename} -> {output_filename}")
        except Exception as e:
            print(f"Error converting {filename}: {str(e)}")
