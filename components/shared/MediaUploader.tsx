"use client";
import Image from "next/image"
import { useToast } from "../ui/use-toast"
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { dataUrl, getImageSize } from "@/lib/utils"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"


type MediaUploaderProps = {
    onValueChange: (value: string) => void
    setImage: React.Dispatch<any>
    publicId: string
    image: any
    type: string
}

const MediaUploader = ({ onValueChange, setImage, image, publicId, type}: MediaUploaderProps ) => {

    const { toast } = useToast()

    const onUploadSuccessHandler = (result: any) => {
        setImage((prev: any) => ({
            ...prev,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url,
        }))

        onValueChange(result?.info?.public_id)

        toast({
            title: "Image uploaded successfully",
            description: "1 credit was deducted from your account.",
            className: "success-toast",
            duration: 5000,
        })
    }
    const onUploadErrorHandler = (result: any) => {
        toast({
            title: "Something wernt wrong when uploading",
            description: "Please try again later.",
            className: "error-toast",
            duration: 5000,
        })
    }

  return (
   <CldUploadWidget
    uploadPreset="thomas-jan_imaginify"
    options={{
        multiple: false,
        resourceType: "image",
    }}
    onSuccess={onUploadSuccessHandler}
    onError={onUploadErrorHandler}
   >
    {({ open }) => (
        <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>
            {publicId ? (
                <>
                <div className="cursor-pointer overflow-hidden rounded-[10px]">
                    <CldImage 
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={publicId}
                        alt="image"
                        sizes="(max-width: 767px) 100vw, 50vw"
                        placeholder={dataUrl as PlaceholderValue}
                        className="media-uploader_cldImage"
                    />
                </div>
                </>
            ) : (
                <div className="media-uploader_cta" onClick={()=> open()}>
                   <div className="media-uploader_cta-image">
                    <Image src="/assets/icons/add.svg" width={24} height={24} alt="Add Image" />
                   </div>
                    <p className="p-14-medium">
                        Click to upload an image
                    </p>
                </div>
            )}
        </div>
    )}
   </CldUploadWidget>
  )
}

export default MediaUploader