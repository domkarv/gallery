import CreateGroup from "./create-group";
import JoinGroup from "./join-group";

export default function Groups() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-balance text-center text-sm font-semibold">
        {`😥 No groups found! Join or create group 🙄`}
      </p>
      <div className="flex flex-row items-center justify-center gap-8">
        <JoinGroup />
        <CreateGroup />
      </div>
    </div>
  );
}
