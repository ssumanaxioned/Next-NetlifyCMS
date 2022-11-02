const isLocalHost = typeof window !== 'undefined' && window.location.host === 'localhost:3000'

module.exports = {
  
  // We want to manually init the config file
  cms_manual_init: true,

  // Backend configuration, in this case with git
  backend: isLocalHost
  ? { name: 'test-repo' }
  : {
      name: 'git-gateway',
      branch: 'staging',
    },

  // Local backend is used during development
  local_backend: true,

  // Where to store the images
  media_folder: "public/images/",

  // Where to link the images
  public_folder: "/images/",

  // The Pages collection
  collections: [
    {
      name: "Pages",
      label: "Page",
      editor: { preview: true },
      label_singular: "Page",
      folder: "content/pages",
      create: true,
      slug: "{{slug}}",
      extension: "md",
      format: "yaml-frontmatter",
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string",
          required: true,
        },
        {
          label: "Builder",
          name: "builder",
          widget: "list",
          types: [
            {
              label: "Header Image",
              name: "header",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                  required: true,
                },
                {
                  label: "Background Image",
                  name: "photo",
                  widget: "image",
                  required: true,
                  allow_multiple: false,
                  media_library: { config: { multiple: true } },
                },
              ],
            },
            {
              label: "CTA Section",
              name: "cta",
              widget: "object",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                  required: true,
                },
                {
                  label: "Link",
                  name: "link",
                  widget: "string",
                },
              ],
            },
            {
              label: "Content",
              name: "content",
              widget: "object",
              fields: [
                {
                  name: "Content",
                  widget: "markdown",
                  required: true,
                },
              ],
            },
            {
              label: "Banner Video",
              name: "banner",
              widget: "object",
              fields: [
                {
                  label: "title",
                  name: "title",
                  widget: "string",
                  required: true,
                },
                {
                  label: "video",
                  name: "video",
                  widget: "file",
                  true: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};