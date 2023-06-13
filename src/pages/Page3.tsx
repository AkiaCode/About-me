/* eslint-disable multiline-ternary */
import type { Component } from 'solid-js'
import { createResource } from 'solid-js'
import Page from '../components/Page'
import type { PinnedRepoPayload } from '../types/pinnedRepo'

const Page3: Component = () => {
  const [pinnedProjects] = createResource<PinnedRepoPayload[]>(async () => {
    const resp = await fetch(
      'https://gh-pinned-repos.egoist.dev/?username=Helloyunho'
    )
    return await resp.json()
  })

  return (
    <Page>
      <div
        class='px-4 py-24 flex justify-center gap-12 items-center flex-col sm:px-16'
        id='page3'
      >
        {pinnedProjects.loading ? (
          <div class='flex justify-between items-center w-full'>
            <div class='flex flex-col'>
              <p class='text-size-4xl line-height-normal font-bold m-0 color-white mix-blend-difference'>
                Wait a bit...
              </p>
            </div>
          </div>
        ) : pinnedProjects.error !== undefined ? (
          <div class='flex justify-between items-center w-full'>
            <div class='flex flex-col'>
              <p class='text-size-4xl line-height-normal font-bold m-0 color-white mix-blend-difference'>
                Oops, an error occured while fetching my pinned projects
              </p>
              <p class='text-size-4xl line-height-normal font-bold m-0'>
                &nbsp;😅
              </p>
            </div>
          </div>
        ) : (
          pinnedProjects()?.map((project) => (
            <a
              class='flex justify-between items-start w-full flex-col sm:flex-row'
              href={project.link}
            >
              <div class='flex flex-col items-start'>
                <p class='text-size-3xl line-height-normal font-bold m-0 color-white mix-blend-difference sm:text-size-4xl'>
                  {project.owner !== 'Helloyunho'
                    ? `${project.owner}/${project.repo}`
                    : project.repo}
                </p>
                <p class='text-size-xl line-height-normal font-normal m-0 color-neutral-500 mix-blend-difference items-start sm:text-size-2xl'>
                  {project.description}
                </p>
              </div>
              <div class='i-tabler-arrow-narrow-right text-2xl color-white mix-blend-difference basis-2xl' />
            </a>
          ))
        )}
      </div>
    </Page>
  )
}

export default Page3
