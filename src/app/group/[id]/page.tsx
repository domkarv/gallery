import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ImagesGrid } from "~/components/image-grid";
import { UploadButton } from "~/components/upload-button";
import { getGroupInfo } from "~/server/group-actions";

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

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-row justify-between">
        <h1 className="text-5xl font-bold text-secondary">{groupInfo.name}</h1>
        <UploadButton groupId={groupInfo.id} />
      </div>

      <ImagesGrid groupId={params.id} />
    </div>
  );
}
