import { Button } from 'hedvig-ui/button'
import { MainHeadline, SecondLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import ReactDropZone from 'react-dropzone'
import styled from 'react-emotion'
import { Dropdown, Form, TextArea } from 'semantic-ui-react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'
import { OnBlurChangeInput } from './inputs'
import { PerilIconOptions } from './peril-icons'

const Wrapper = styled(Form)``

const PerilEditWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  margin-bottom: 1rem;
`

const TitleWrapper = styled('div')`
  padding-top: 1rem;
`

const CoverageWrapper = styled('div')`
  display: flex;
  flex-direction: row;
`

const CoverageItemWrapper = styled('div')`
  display: flex;
`

const Coverage = styled('div')`
  width: 50%;
  padding: 1rem;

  ${CoverageItemWrapper}, .input {
    width: 100%;
  }
`

const PERIL_CONTENTS_KEY = '_hvg:peril-contents'
const PERIL_FILE_KEY = '_hvg:peril-file-name'

interface Peril {
  title: string | { props: { children: string } }
  shortDescription: string
  description: string
  covered: string[]
  exceptions: string[]
  info: string
  icon: string
  iconName: string
}

export const PerilsEditorComponent: React.FC<WithShowNotification> = ({
  showNotification,
}) => {
  const [fileName, setFileName] = React.useState(() =>
    localStorage.getItem(PERIL_FILE_KEY),
  )
  const [contents, setContents] = React.useState(() =>
    localStorage.getItem(PERIL_CONTENTS_KEY),
  )
  const [parsedPerils, reallySetParsedPerils] = React.useState<ReadonlyArray<
    Peril
  > | null>(null)
  const setParsedPerils = (perils: ReadonlyArray<Peril>) => {
    reallySetParsedPerils(perils)
    localStorage.setItem(PERIL_CONTENTS_KEY, JSON.stringify(perils))
  }

  React.useEffect(() => {
    if (!contents) {
      return
    }

    setParsedPerils(JSON.parse(contents))
  }, [contents])

  const handleFileUpload = ([file]: File[]) => {
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target!.result as string

      if (!isValidJson(result)) {
        showNotification({
          message: 'Unable to parse this file',
          type: 'red',
          header: 'Invalid file',
        })
        return
      }

      setContents(result)
      localStorage.setItem(PERIL_CONTENTS_KEY, result)
      setFileName(file.name)
      localStorage.setItem(PERIL_FILE_KEY, file.name)
    }
    reader.readAsText(file)
  }

  return (
    <>
      <MainHeadline>📝 Perils editor</MainHeadline>
      <ReactDropZone onDrop={handleFileUpload} accept={['application/json']}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Button {...getRootProps()} css={undefined}>
            <input {...getInputProps()} />
            {isDragActive ? 'Drag file to edit' : 'Select file to edit'}
          </Button>
        )}
      </ReactDropZone>

      <SecondLevelHeadline>
        Edit <code>{fileName}</code>
        <a
          href={`data:application/json;charset=utf8,${encodeURIComponent(
            JSON.stringify(parsedPerils, null, 2),
          )}`}
          download={fileName}
        >
          Download file
        </a>
      </SecondLevelHeadline>
      <Wrapper>
        {parsedPerils &&
          parsedPerils.map((peril, index) => {
            const actualTitle =
              typeof peril.title === 'string'
                ? peril.title
                : peril.title.props.children
            const updateField = (field: string) => (value: any) => {
              setParsedPerils(
                parsedPerils.map((originalPeril, i_) => {
                  if (i_ === index) {
                    return { ...originalPeril, [field]: value }
                  }
                  return originalPeril
                }),
              )
            }

            return (
              <PerilEditWrapper key={actualTitle}>
                <OnBlurChangeInput
                  originalValue={actualTitle}
                  onUpdate={(newTitle) => {
                    updateField('title')(newTitle)
                  }}
                  size="big"
                />
                <TitleWrapper>Short Description</TitleWrapper>
                <TextArea
                  value={peril.shortDescription}
                  onChange={(_, data) => {
                    updateField('shortDescription')(data.value)
                  }}
                />
                <TitleWrapper>Full Description</TitleWrapper>
                <TextArea
                  value={peril.description}
                  onChange={(_, data) => {
                    updateField('description')(data.value)
                  }}
                />

                <CoverageWrapper>
                  <Coverage>
                    Covered
                    {peril.covered.map((coveredText, coveredIndex) => (
                      <CoverageItemWrapper key={coveredText}>
                        <OnBlurChangeInput
                          originalValue={coveredText}
                          onUpdate={(newCoveredText) => {
                            updateField('covered')(
                              peril.covered.map((original, i_) => {
                                if (i_ === coveredIndex) {
                                  return newCoveredText
                                }
                                return original
                              }),
                            )
                          }}
                        />
                        <Button
                          variation="danger"
                          onClick={() => {
                            updateField('covered')(
                              peril.covered.filter(
                                (_, i) => i !== coveredIndex,
                              ),
                            )
                          }}
                        >
                          &times;
                        </Button>
                      </CoverageItemWrapper>
                    ))}
                    <Button
                      variation="success"
                      type="button"
                      onClick={() => {
                        updateField('covered')(peril.covered.concat(['']))
                      }}
                    >
                      + Add coverage
                    </Button>
                  </Coverage>
                  <Coverage>
                    Exceptions
                    {peril.exceptions.map((exceptionText, exceptionIndex) => (
                      <CoverageItemWrapper key={exceptionText}>
                        <OnBlurChangeInput
                          originalValue={exceptionText}
                          onUpdate={(newExceptionText) => {
                            updateField('exceptions')(
                              peril.exceptions.map((original, i_) => {
                                if (i_ === exceptionIndex) {
                                  return newExceptionText
                                }
                                return original
                              }),
                            )
                          }}
                        />
                        <Button
                          variation="danger"
                          onClick={() => {
                            updateField('exceptions')(
                              peril.exceptions.filter(
                                (_, i) => i !== exceptionIndex,
                              ),
                            )
                          }}
                          type="button"
                        >
                          &times;
                        </Button>
                      </CoverageItemWrapper>
                    ))}
                    <Button
                      variation="success"
                      type="button"
                      onClick={() => {
                        updateField('exceptions')(peril.exceptions.concat(['']))
                      }}
                    >
                      + Add exception
                    </Button>
                  </Coverage>
                </CoverageWrapper>

                <span>Add Icon</span>
                <Dropdown
                  placeholder={'Icon Name'}
                  value={peril.iconName}
                  fluid
                  selection
                  options={PerilIconOptions}
                  onChange={(event) =>
                    updateField('iconName')(event.currentTarget.textContent)
                  }
                />

                <TitleWrapper>Info</TitleWrapper>
                <TextArea
                  value={peril.info}
                  onChange={(_, data) => {
                    updateField('info')(data.value)
                  }}
                />

                <Button
                  variation="danger"
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        `Do you really want to delete the peril ${actualTitle}?`,
                      )
                    ) {
                      setParsedPerils(
                        parsedPerils.filter((_, i) => i !== index),
                      )
                    }
                  }}
                >
                  &times; Delete peril
                </Button>
              </PerilEditWrapper>
            )
          })}

        <Button
          type="button"
          variation="success"
          onClick={() => {
            setParsedPerils(
              parsedPerils?.concat([
                {
                  title: '',
                  shortDescription: '',
                  description: '',
                  info: '',
                  exceptions: [],
                  covered: [],
                  icon: '',
                  iconName: '',
                },
              ]) ?? [],
            )
          }}
        >
          + Add peril
        </Button>
      </Wrapper>
    </>
  )
}

export const PerilsEditor = withShowNotification(PerilsEditorComponent)

const isValidJson = (thing: string): boolean => {
  try {
    JSON.parse(thing)
    return true
  } catch {
    return false
  }
}
