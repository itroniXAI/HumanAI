import type { FastifyPluginAsync } from 'fastify'

import {
  LEON_VERSION,
  HAS_AFTER_SPEECH,
  HAS_STT,
  HAS_TTS,
  STT_PROVIDER,
  TTS_PROVIDER,
  IS_TELEMETRY_ENABLED,
  LLM_PROVIDER
} from '@/constants'
import { LLM_MANAGER, PERSONA } from '@/core'
import { LogHelper } from '@/helpers/log-helper'
import type { APIOptions } from '@/core/http-server/http-server'

export const getInfo: FastifyPluginAsync<APIOptions> = async (
  fastify,
  options
) => {
  fastify.route({
    method: 'GET',
    url: `/api/${options.apiVersion}/info`,
    handler: async (_request, reply) => {
      LogHelper.title('GET /info')
      const message = 'Information pulled.'
      LogHelper.success(message)

      reply.send({
        success: true,
        status: 200,
        code: 'info_pulled',
        message,
        after_speech: HAS_AFTER_SPEECH,
        telemetry: IS_TELEMETRY_ENABLED,
        llm: {
          enabled: LLM_MANAGER.isLLMEnabled,
          provider: LLM_PROVIDER
        },
        stt: {
          enabled: HAS_STT,
          provider: STT_PROVIDER
        },
        tts: {
          enabled: HAS_TTS,
          provider: TTS_PROVIDER
        },
        mood: {
          type: PERSONA.mood.type,
          emoji: PERSONA.mood.emoji
        },
        version: LEON_VERSION
      })
    }
  })
}
