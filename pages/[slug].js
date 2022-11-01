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

function getAllSlug() {
  const arr = [];
  fs.readdirSync(`content/pages`).forEach(file =>arr.push(file));
  const list = arr.map((e) => e.replace('.md',''))
  return list;
}

export async function getStaticProps({ params }) {
  const local = getBySlug("content/pages", params.slug);

  return {
    props: {
      local,
    },
  };
}

export async function getStaticPaths() {
  let paths = null;
  const all = getAllSlug();

  paths = all.map((e) => ({
    params: { slug: e }
  }))

  return {
    paths: paths,
    fallback: false,
  }
}


const Local = ({ local }) => {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/spanish">Spanish</Link>
      <Link href="/marathi">Marathi</Link>
      {
        local.builder.map((item, index) => (
          <Builder key={index} type={item.type} item={item} />
        ))
      }
    </>
  )
}

export default Local;