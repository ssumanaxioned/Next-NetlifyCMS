import Image from "next/image";

function BackgroundImage({ item }) {
  return (
    <>
      {
        item.photo && item.title &&
        <div style={{ width: "100%" }}>
          <Image
            width="250px"
            height="450px"
            src={item.photo}
            layout="fixed"
          />
          <h1 style={{ color: "black" }}>{item.title}</h1>
        </div>
      }
    </>
  );
}

function Content({ item }) {
  return (
    <>
      {
        item.content && <div>{item.content}</div>
      }
    </>
  )
}

function Cta({ item }) {
  return (
    <>
      {
        item.link && <a href={item.link}>{item.title}</a>
      }
    </>
  )
}

function VideoBanner({ item }) {
  return (
    <>
      {
        item.file && <video src={item.file} height="200px" width="500px"></video>
      }
    </>
  )
}

const components = {
  header: BackgroundImage,
  content: Content,
  cta: Cta,
  video: VideoBanner,
};

export default function Builder(props) {
  const Component = components[props.type];

  return <Component item={props.item} />;
}