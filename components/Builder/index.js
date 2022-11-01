import Image from "next/image";

function BackgroundImage({ item }) {
  return (
    <div style={{ width: "100%" }}>
      <Image
        width="250px"
        height="450px"
        src={item.photo}
        layout="fixed"
      />
      <h1 style={{ color: "black" }}>{item.title}</h1>
    </div>
  );
}

function Content({ item }) {
  return <div>{item.content}</div>;
}

function Cta({ item }) {
  return <a href={item.link}>{item.title}</a>;
}

const components = {
  header: BackgroundImage,
  content: Content,
  cta: Cta,
};

export default function Builder(props) {
  const Component = components[props.type];

  return <Component item={props.item} />;
}