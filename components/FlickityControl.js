export default function FlickityControl({ imgs }) {
  return (
    <div className="flex flex-nowrap w-full items-center mt-[18px] relative justify-center">
      <div className="flex items-center justify-center px-[20px] m-[-6px] flex-nowrap">
        {imgs.map((_, index) => (
          <button
            key={index}
            className="relative m-[6px] h-[12px] w-[12px] rounded-full"
            style={{ backgroundColor: "#000" }}
          ></button>
        ))}
      </div>
    </div>
  );
}
