import { ImagesGrid } from "~/components/image-grid";
import { UploadButton } from "~/components/upload-button";
import { getGroupInfo } from "~/server/group-actions";

interface PageProps {
  params: {
    name: string;
  };
}

export default async function Page({ params }: PageProps) {
  const groupInfo = await getGroupInfo({ name: params.name });

  if (!groupInfo) {
    return (
      <div className="text-center text-sm font-semibold sm:text-lg">
        {`😥 Invalid Group`}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-row justify-between">
        <h1 className="text-5xl font-bold text-secondary">{params.name}</h1>
        <UploadButton groupId={groupInfo.id} />
      </div>

      <ImagesGrid />
    </div>
  );
}
