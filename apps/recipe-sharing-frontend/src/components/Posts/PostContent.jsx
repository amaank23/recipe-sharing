import { PropTypes } from "prop-types";

const PostContent = ({ text, images, recipe }) => {
  return (
    <div className="mt-6">
      <p className="text-sm text-[#2D3139] break-words">{text}</p>
      {recipe && (
        <div className="">
          <h4 className="text-lg mb-4">
            <span className="font-bold">Recipe:</span> {recipe?.name}
          </h4>
          <p className="mb-4">{recipe?.description}</p>
          <h4 className="font-bold text-lg">Ingredients</h4>
          <ul className="mt-2 flex flex-col gap-1">
            {recipe?.ingredients?.map((item, i) => {
              return (
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                  <li key={item.id} className="text-lg">{`${item.name}`}</li>
                </div>
              );
            })}
          </ul>
        </div>
      )}
      {images?.length > 0 && (
        <>
          {images.length === 1 && (
            <div className="grid grid-cols-1 h-[331px] gap-4 mt-6">
              <div className="rounded-xl overflow-hidden">
                <img src={images[0]} className="w-full h-full" />
              </div>
            </div>
          )}
          {images.length === 2 && (
            <div className="grid grid-cols-2 h-[200px] gap-2 mt-6">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={images[0]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={images[1]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          )}
          {images.length === 3 && (
            <div className="grid grid-cols-2 gap-2 mt-6">
              <div
                className="rounded-xl overflow-hidden h-[250px]"
                style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
              >
                <img
                  src={images[0]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[1]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[2]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          )}
          {images.length === 4 && (
            <div className="grid grid-cols-2 gap-2 mt-6">
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[0]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[1]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[2]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[3]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          )}
          {images.length > 4 && (
            <div className="grid grid-cols-2 gap-2 mt-6">
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[0]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[1]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px]">
                <img
                  src={images[2]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[150px] relative">
                <div className="bg-[#000000a8] absolute left-0 top-0 w-full h-full flex justify-center items-center">
                  <span className="text-white text-5xl">
                    +{images.length - 3}
                  </span>
                </div>
                <img
                  src={images[3]}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

PostContent.propTypes = {
  text: PropTypes.string.isRequired,
  images: PropTypes.array,
};

export default PostContent;
