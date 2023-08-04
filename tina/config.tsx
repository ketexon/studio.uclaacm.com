import * as React from "react";
import { defineConfig, wrapFieldsWithMeta } from "tinacms";
import TextField from "@mui/material/TextField"

import { TinaField, UIField } from "@tinacms/schema-tools"

const host = process.env.NEXT_PUBLIC_URL || process.env.HOST || ""

import { isLocal } from "./isLocal";

const root = "content/"

type UIFieldProps<Type, List extends boolean> = Parameters<Exclude<UIField<Type, List>["component"], string>>[0]

const config = defineConfig({

  contentApiUrlOverride: `${host}/api/gql`,
  admin: {
    auth: {
      ...isLocal ? { useLocalAuth: isLocal } : {
        customAuth: true,
        authenticate: async () => {
          window.location.assign("/api/auth/login?returnTo=/admin/");
        },
        getUser: async () => {
          return fetch("/api/auth/me").then(res => res.json())
            .then(user => (user["https://studio.uclaacm.com/roles"] || []).includes("Admin") ? user : false)
            .catch(e => false);
        },
        logout: async () => {
          window.location.assign(`/api/auth/logout?returnTo=/admin/`);
        },
      },
    },
  },
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN! || "foo",
  media: {
    ...isLocal ? {
      tina: {
        mediaRoot: "media",
        publicFolder: "public",
      }
    } : {
      loadCustomStore: async () => {
        const pack = await import("next-tinacms-cloudinary");
        return pack.TinaCloudCloudinaryMediaStore;
      },
    }
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Test",
        name: "test",
        path: `${root}test`,
        fields: [
          {
            type: "string",
            label: "string",
            name: "string"
          }
        ]
      },
      {
        label: "Byte Sized Tutorials",
        name: "tutorial",
        path: `${root}tutorials`,
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            required: true,
          },
          {
            type: "string",
            label: "Author",
            name: "author",
            description: `
              Author metadata.
              The name of the document's author.
            `,
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            description: `
              Description metadata.
              A short and accurate summary of the content of the page.
              Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
            `,
            required: true,
          },
          {
            type: "image",
            label: "Image",
            name: "image",
            description: `Image`,
            required: true,
          },
          {
            type: "string",
            label: "Keywords",
            name: "keywords",
            description: `
              Keywords metadata.
            `,
            list: true,
          },
          {
            type: "object",
            label: "Open Graph Metadata",
            name: "og",
            description: `Metadata used by the OpenGraph protocol. See https://ogp.me/`,
            fields: [
              {
                type: "string",
                label: "Type",
                name: "type",
                description: `The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.`,
                options: [
                  {
                    value: "video.movie",
                    label: "Video",
                  },
                  {
                    value: "article",
                    label: "Article",
                  },
                  {
                    value: "website",
                    label: "Website"
                  }
                ],
                required: true,
              },
            ]
          },
          {
            type: "string",
            label: "Body",
            name: "body",
            isBody: true,
            required: true,
          },
        ]
      },
      {
        label: "Showcase",
        name: "showcase",
        path: `${root}showcase`,
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            required: true,
          },
          {
            type: "string",
            label: "Subtitle",
            name: "subtitle"
          },
          {
            type: "string",
            label: "Description",
            name: "description",
          },
          {
            type: "image",
            label: "Image",
            name: "image",
          },
          {
            type: "string",
            label: "External Image",
            name: "image_url",
            ui: {
              component: ({ input }) => {
                const [imgSrc, setImgSrc] = React.useState<string | null>(null);
                React.useEffect(() => {
                  try {
                    const url = new URL(input.value);
                    setImgSrc(url.toString());
                  } catch {};
                }, [input.value])
                return (
                  <div className="relative mb-5 last:mb-0">
                    <label className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2" htmlFor={input.name}></label>
                    <input
                      className="
                        shadow-inner focus:shadow-outline
                        focus:border-blue-500 focus:outline-none
                        block text-base placeholder:text-gray-300
                        px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150
                        focus:text-gray-900 rounded-md"
                        id={input.name} {...input}/><br/>
                    <span>{`Preview${imgSrc ? ': ' : ' Unavailable'}`}</span>
                    {imgSrc && <img src={imgSrc} style={{maxHeight: "500px"}}/>}
                  </div>
                )
              }
            }
          },
          {
            type: "string",
            label: "Image Alt",
            name: "alt"
          },
          {
            isBody: true,
            type: "rich-text",
            label: "Body",
            name: "body"
          }
        ]
      }
    ],
  },
});

export default config;
