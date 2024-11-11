import React, { useState, useRef } from 'react'

import { Providers } from '@/components/MainLayout'
import { Editor } from '@tinymce/tinymce-react'
import Searchbar from '@/components/Searchbar'
import TempDesignItem from '@/components/TempDesign/Tempdesign'

export default function DesignEdit() {
  const [filterQuery, setFilterQuery] = useState<string>('')
  const editorRef = useRef(null)
  const [savedContent, setSavedContent] = useState('')

  function handleFilter(e) {
    setFilterQuery(e.target.value)
  }

  function saveContent() {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      setSavedContent(content)
      console.log('Content saved:', content)
    }
  }

  function loadContent() {
    if (editorRef.current) {
      editorRef.current.setContent(savedContent)
      console.log('Content loaded:', savedContent)
    }
  }

  return (
    <Providers>
      <div className="w-full h-[calc(100vh-63.99px)] bg-[#24292D] overflow-hidden">
        <div className="absolute left-0 w-[280px] h-[calc(100vh-63.99px)] bg-[#343A40]">
          <Searchbar fnSearch={handleFilter} />
          <TempDesignItem keyword={filterQuery} />
        </div>

        <button
          className="absolute rounded-sm top-[73px] right-[30px] bg-[#343A40] z-50 py-[1px] px-[5px]"
          onClick={saveContent}
        >
          Save
        </button>

        {/* <button
          className="absolute rounded-sm top-[73px] right-[70px] bg-[#343A40] z-50 py-[1px] px-[5px]"
          onClick={loadContent}
        >
          LoadContent
        </button> */}

        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            plugins: [
              'anchor',
              'autolink',
              'charmap',
              'codesample',
              'preview',
              'autosave',
              'emoticons',
              'image',
              'link',
              'lists',
              'media',
              'searchreplace',
              'table',
              'visualblocks',
              'wordcount',
              'checklist',
              'mediaembed',
              'casechange',
              'export',
              'formatpainter',
              'pageembed',
              'a11ychecker',
              'tinymcespellchecker',
              'permanentpen',
              'powerpaste',
              'advtable',
              'advcode',
              'editimage',
              'advtemplate',
              'ai',
              'mentions',
              'tinycomments',
              'tableofcontents',
              'footnotes',
              'mergetags',
              'autocorrect',
              'typography',
              'inlinecss',
              'markdown',
              'importword',
              'exportword',
              'exportpdf',
            ],
            content_style: 'body { background-color: #343A40; color: white}',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject('See docs to implement AI Assistant'),
              ),
            exportpdf_converter_options: {
              format: 'Letter',
              margin_top: '1in',
              margin_right: '1in',
              margin_bottom: '1in',
              margin_left: '1in',
            },
            exportword_converter_options: { document: { size: 'Letter' } },
            importword_converter_options: {
              formatting: {
                styles: 'inline',
                resets: 'inline',
                defaults: 'inline',
              },
            },
          }}
          initialValue="Welcome to TinyMCE!"
        />
      </div>
    </Providers>
  )
}
