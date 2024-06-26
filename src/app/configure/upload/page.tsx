'use client'

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const Page = () => {
    const [isDragover, setIsDragOver] = useState(false);

    const onDropRejected = () => { };
    const onDropAccepted = () => { };

    return (
        <div
        className={cn("relative h-full w-full rounded-xl flex-1 my-16 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center ",
            {'ring-blue-900/25 bg-blue-900/10': isDragover}
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

                    onDragEnter={()=>{setIsDragOver(true)}}
                    onDragLeave={()=>{setIsDragOver(false)}}
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
