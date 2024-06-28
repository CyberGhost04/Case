'use client'

import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { startTransition, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

const Page = () => {
    const { toast } = useToast();
    const [isDragover, setIsDragOver] = useState(false);
    const router = useRouter();

    const { startUpload, isUploading } = useUploadThing('imageUploader', {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`)
            })
        },
    })

    const onDropRejected = (rejectedFiles: FileRejection[]) => {

        const [file] = rejectedFiles;
        setIsDragOver(false);

        toast({
            title: `${file.file.type} type is not supported.`,
            description: "Please choose a PNG, JPG, or JPEG image instead.",
            variant: "destructive"
        })

    };
    const onDropAccepted = (acceptedFiles: File[]) => {

        startUpload(acceptedFiles, { configId: undefined });
        setIsDragOver(false);

    };

    return (
        <div
            className={cn("relative h-full w-full rounded-xl flex-1 my-16 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center ",
                { 'ring-blue-900/25 bg-blue-900/10': isDragover }
            )}>
            <div className="relative flex flex-1 flex-col items-center justify-center w-full">
                <Dropzone
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpeg"],
                        "image/jpg": [".jpg"],
                    }}

                    onDragEnter={() => { setIsDragOver(true) }}
                    onDragLeave={() => { setIsDragOver(false) }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="h-full w-full flex flex-1 justify-center items-center" {...getRootProps()}>
                            <input {...getInputProps()} />
                            Drop files here
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    );
};

export default Page;
