import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Builder from "../components/Builder";
import Link from "next/link";

function getBySlug(dir, slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(dir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return data;
}

export async function getStaticProps() {
  const home = getBySlug("content/pages", "home");

  return {
    props: {
      home,
    },
  };
}

const Home = ({ home }) => {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/spanish">Spanish</Link>
      {
        home.builder.map((item, index) => (
          <Builder key={index} type={item.type} item={item} />
        ))
      }
    </>
  )
}

export default Home
