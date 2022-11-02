import { useEffect } from "react";
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

export async function getStaticProps() {
  const home = getBySlug("content/pages", "home");
  let paths = null;
  const all = getAllSlug();

  paths = all.map((e) => ({
    params: { slug: e }
  }))

  return {
    props: {
      home, paths
    },
  };
}

const Home = ({ home, paths }) => {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
  }, [])
  return (
    <>
      {
        paths.map((path) => (
          path.params.slug === "home" ? 
          <Link href='/'>
            <a style={{ marginRight: "10px" }}>
            {path.params.slug}
            </a>
          </Link>
          : 
          <Link href={`/${path.params.slug}`}>
            <a style={{ marginRight: "10px" }}>
            {path.params.slug}
            </a>
          </Link>
        ))
      }
      {
        home.builder.map((item, index) => (
          <Builder key={index} type={item.type} item={item} />
        ))
      }
    </>
  )
}

export default Home
