import { getImages } from "~/server/image-actions";
import ImageDialog from "./image-dialog";

export async function ImagesGrid() {
  const images = await getImages();
  const MAX_COLUMNS = 4;

  function getColumns(colNum: number) {
    return images.filter((_, idx) => idx % MAX_COLUMNS === colNum);
  }

  return (
    <>
      {images.length === 0 && (
        <p className="text-lg font-semibold">
          {`😥 No images found! Upload images 🙄`}
        </p>
      )}

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-4">
        {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
          (column, idx) => {
            return (
              <div className="flex flex-col gap-4" key={idx}>
                {column.map((img) => {
                  return <ImageDialog img={img} key={img.id} />;
                })}
              </div>
            );
          },
        )}
      </div>
    </>
  );
}
