import { getGroups } from "~/server/group-actions";
import GroupCard from "./group-card";

export default async function Groups() {
  const groups = await getGroups();

  if (!groups) {
    return (
      <p className="text-balance text-center text-sm font-semibold sm:text-lg">
        {`😥 You are not authenticated 🙄`}
      </p>
    );
  }

  return groups.length == 0 ? (
    <p className="text-balance text-center text-sm font-semibold sm:text-lg">
      {`😥 No groups found! Join or create group 🙄`}
    </p>
  ) : (
    <div className="grid grid-cols-1 items-center gap-6 bg-background md:grid-cols-3">
      {groups.map((el) => {
        return <GroupCard key={el.id} group={el} />;
      })}
    </div>
  );
}
