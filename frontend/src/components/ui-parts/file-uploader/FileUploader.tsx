import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import UploadFileIcon from "../../ui-elements/icons/UploadFileIcon";

/** Propsの型定義 */
interface PropsType {
  /** 識別のためのID: 複数 ImageFileUpload Component を使用するときに識別するため */
  id: number;
}

/**
 * NOTE: FileUploader
 * - 画像または動画ファイルをアップロードするための Component
 */
const FileUploader = (props: PropsType) => {
  const { id } = props;

  /**
   * NOTE: ImageFile: 画像 ファイル State
   * - 画像ファイルをSetするためのState
   * - MP4などの動画ファイルも含む
   */
  const [imageFile, setImageFile] = useState<
    Blob | MediaSource | string | undefined
  >();

  /** ImageFileのSetter */
  const imageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<Blob | MediaSource | string | undefined>>
  ) => {
    if (e.target.files) {
      setter(e.target.files[0]);
    }
  };

  /**
   * NOTE: Set された ファイルの削除
   */
  const deleteFile = () => {
    setImageFile(undefined);
  };

  // SetされたFileの参照情報を確認するための ref_Data: Reference_Data
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /** Image 領域 をClick */
  const imageIconClick = () => {
    fileInputRef.current?.click();
  };

  /** NOTE: 動画フラグ */
  const [isVideo, setIsVideo] = useState<boolean>(false);

  // NOTE: Fileの変更検知
  useEffect(() => {
    console.log("ファイルの変更検知");
    console.log("imageFile", imageFile);
    let file = imageFile as Blob;
    if (file) {
      console.log("imageFile.type", file.type);
      if (file?.type.includes("video")) {
        console.log("動画ファイルです");
        setIsVideo(true);
      } else {
        console.log("画像ファイルです");
        setIsVideo(false);
      }
    }
  }, [imageFile]);

  /**
   * NOTE: Drag & Dropの処理
   */
  const imageDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setter: Dispatch<SetStateAction<Blob | MediaSource | string | undefined>>
  ) => {
    if (e.dataTransfer.files) {
      e.preventDefault();
      setter(e.dataTransfer.files[0]);
    }
  };
  const imageDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-[270px] w-[270px] cursor-pointer rounded-[8px] border-none object-cover">
      {
        /** NOTE: 画像ファイル or 動画ファイル がSetされている場合 */
        imageFile ? (
          // ファイルをSetしたら表示する
          <div className="">
            {/* Set ファイル 削除 Button  */}
            <div
              className="relative left-[245px] top-[30px] z-50 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[100%] bg-[#AFAEB3] font-bold text-[#fff]"
              onClick={() => deleteFile()}
            >
              ×
            </div>
            {/* 画像 or 動画で、表示 Componentを切り替える */}
            <div>
              {isVideo ? (
                // 動画の場合
                <div>
                  <video
                    src={
                      typeof imageFile === String.name.toLocaleLowerCase()
                        ? (imageFile as string)
                        : URL.createObjectURL(imageFile as Blob)
                    }
                    className="h-[270px] w-[270px] cursor-pointer rounded-[8px] border-none  object-cover"
                    controls
                    autoPlay
                  />
                </div>
              ) : (
                // 画像の場合
                <img
                  src={
                    typeof imageFile === String.name.toLocaleLowerCase()
                      ? (imageFile as string)
                      : URL.createObjectURL(imageFile as Blob)
                  }
                  alt="Top Image file"
                  className="h-[270px] w-[270px] cursor-pointer rounded-[8px] border-none  object-cover"
                />
              )}
            </div>
          </div>
        ) : (
          /** NOTE: ファイルがSetされていない場合: 画像または動画をアップロード できる領域を展開する */
          <div
            onClick={() => imageIconClick()}
            onDrop={(e) => imageDrop(e, setImageFile)}
            onDragOver={(e) => imageDragOver(e)}
            className="flex h-[270px] w-[270px] cursor-pointer flex-col items-center justify-center gap-[20px] rounded-[8px] border-none bg-[#F4F6F7] object-cover"
          >
            <label htmlFor={`image_file_input${id}`} className="">
              <div className="">
                <UploadFileIcon />
              </div>
              <input
                id={`image_file_input${id}`}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => imageUpload(e, setImageFile)}
              />
            </label>
            {/* 画像または動画をアップロード MSG */}
            <div className="font-['Roboto'] text-[12px] font-medium leading-[8px] text-[#AFAEB3] text-zinc-400">
              画像または動画をアップロード
            </div>
          </div>
        )
      }
    </div>
  );
};

export default FileUploader;
