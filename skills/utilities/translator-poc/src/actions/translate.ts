import type { ActionFunction } from '@sdk/types'
import { leon } from '@sdk/leon'
import { Network } from '@sdk/network'

export const run: ActionFunction = async function (params) {
  const targetLanguage = params.slots.target_language.resolution.value
  const textToTranslate = params.new_utterance
  const network = new Network({
    baseURL: `${process.env['LEON_HOST']}:${process.env['LEON_PORT']}/api/v1`
  })

  /**
   * TODO: create SDK methods to handle request and response for every LLM duty
   */
  const response = await network.request({
    url: '/llm-inference',
    method: 'POST',
    data: {
      dutyType: 'translation',
      input: textToTranslate,
      data: {
        target: targetLanguage,
        autoDetectLanguage: true
      }
    }
  })
  const translation = response.data.output

  await leon.answer({
    key: 'translate',
    data: {
      output: translation
    }
  })
}
