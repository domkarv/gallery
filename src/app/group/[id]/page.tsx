import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import ChangeThumbnailBtn from "~/components/change-thumbnail";
import { ImagesGrid } from "~/components/image-grid";
import { UploadButton } from "~/components/upload-button";
import { blurEffect } from "~/lib/blur-effect";
import { getGroupInfo, getThumbnailImage } from "~/server/group-actions";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const user = auth();
  const groupInfo = await getGroupInfo({ id: params.id });

  if (!user.userId) {
    redirect("/");
  }

  if (user.userId && !groupInfo) {
    return (
      <div className="text-center text-sm font-semibold sm:text-lg">
        {`😥 Invalid Group`}
      </div>
    );
  }

  if (user.userId !== groupInfo?.admin) {
    return (
      <p className="text-balance text-center text-sm font-semibold sm:text-lg">
        {`😥 You are not authenticated to access this group 🙄`}
      </p>
    );
  }

  const thumbnailImage = await getThumbnailImage(groupInfo.thumbnail);

  const blur = await blurEffect(
    thumbnailImage ?? "https://generated.vusercontent.net/placeholder.svg",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col gap-4 sm:hidden">
        <UploadButton groupId={groupInfo.id} />

        <ChangeThumbnailBtn
          groupId={groupInfo.id}
          imagePublicId={groupInfo.thumbnail!}
        />
      </div>

      <div className="relative mb-8 flex aspect-[4/1]">
        <Image
          src={
            thumbnailImage ??
            "https://generated.vusercontent.net/placeholder.svg"
          }
          alt={groupInfo.name}
          width={400}
          height={400}
          className="h-auto w-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blur}
          unoptimized
          loading="lazy"
        />

        <h1 className="absolute bottom-3 left-3 text-5xl font-bold mix-blend-difference">
          {groupInfo.name}
        </h1>

        <div className="absolute right-3 top-3 hidden flex-row gap-4 sm:flex">
          <UploadButton groupId={groupInfo.id} />

          <ChangeThumbnailBtn
            groupId={groupInfo.id}
            imagePublicId={groupInfo.thumbnail!}
          />
        </div>
      </div>

      <ImagesGrid groupId={params.id} />
    </div>
  );
}
