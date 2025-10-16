import { createHmac } from 'crypto'

export interface WebhookEvent {
  type: 'github' | 'vercel' | 'figma' | 'slack' | 'custom'
  event: string
  data: Record<string, any>
  timestamp: Date
}

export interface WebhookResult {
  success: boolean
  message: string
  actions: string[]
  metadata?: Record<string, any>
}

export class WebhookHandler {
  private secrets: Record<string, string> = {
    github: process.env.GITHUB_WEBHOOK_SECRET || '',
    vercel: process.env.VERCEL_WEBHOOK_SECRET || '',
    figma: process.env.FIGMA_WEBHOOK_SECRET || '',
    slack: process.env.SLACK_WEBHOOK_SECRET || '',
    custom: process.env.CUSTOM_WEBHOOK_SECRET || '',
  }

  verifySignature(type: string, signature: string, body: any): boolean {
    const secret = this.secrets[type]
    if (!secret) return false

    const expectedSignature = this.generateSignature(secret, body)
    return signature === expectedSignature
  }

  private generateSignature(secret: string, body: any): string {
    const hmac = createHmac('sha256', secret)
    hmac.update(JSON.stringify(body))
    return `sha256=${hmac.digest('hex')}`
  }

  async process(event: WebhookEvent): Promise<WebhookResult> {
    try {
      const { type, event: eventName, data, timestamp } = event

      switch (type) {
        case 'github':
          return await this.handleGitHubWebhook(eventName, data, timestamp)
        case 'vercel':
          return await this.handleVercelWebhook(eventName, data, timestamp)
        case 'figma':
          return await this.handleFigmaWebhook(eventName, data, timestamp)
        case 'slack':
          return await this.handleSlackWebhook(eventName, data, timestamp)
        case 'custom':
          return await this.handleCustomWebhook(eventName, data, timestamp)
        default:
          return {
            success: false,
            message: `Unsupported webhook type: ${type}`,
            actions: [],
          }
      }
    } catch (error) {
      console.error('Webhook processing error:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        actions: [],
      }
    }
  }

  private async handleGitHubWebhook(
    event: string,
    data: any,
    timestamp: Date
  ): Promise<WebhookResult> {
    const actions: string[] = []

    switch (event) {
      case 'push':
        actions.push('Trigger analysis on push')
        actions.push('Update project status')
        break
      case 'pull_request':
        actions.push('Run PR analysis')
        actions.push('Generate diff report')
        break
      case 'issues':
        actions.push('Process issue updates')
        break
      case 'deployment':
        actions.push('Update deployment status')
        actions.push('Run post-deployment tests')
        break
    }

    return {
      success: true,
      message: `GitHub webhook processed: ${event}`,
      actions,
      metadata: {
        repository: data.repository?.full_name,
        branch: data.ref?.replace('refs/heads/', ''),
        commit: data.head_commit?.id,
      },
    }
  }

  private async handleVercelWebhook(
    event: string,
    data: any,
    timestamp: Date
  ): Promise<WebhookResult> {
    const actions: string[] = []

    switch (event) {
      case 'deployment':
        actions.push('Update deployment status')
        actions.push('Run post-deployment analysis')
        break
      case 'build':
        actions.push('Process build results')
        actions.push('Update build status')
        break
      case 'error':
        actions.push('Process deployment error')
        actions.push('Send error notification')
        break
    }

    return {
      success: true,
      message: `Vercel webhook processed: ${event}`,
      actions,
      metadata: {
        deployment: data.deployment?.id,
        project: data.project?.name,
        url: data.deployment?.url,
      },
    }
  }

  private async handleFigmaWebhook(
    event: string,
    data: any,
    timestamp: Date
  ): Promise<WebhookResult> {
    const actions: string[] = []

    switch (event) {
      case 'file_update':
        actions.push('Sync design tokens')
        actions.push('Update component library')
        break
      case 'comment':
        actions.push('Process design feedback')
        break
      case 'version':
        actions.push('Update design version')
        actions.push('Generate changelog')
        break
    }

    return {
      success: true,
      message: `Figma webhook processed: ${event}`,
      actions,
      metadata: {
        file: data.file?.name,
        version: data.version?.id,
        user: data.triggered_by?.handle,
      },
    }
  }

  private async handleSlackWebhook(
    event: string,
    data: any,
    timestamp: Date
  ): Promise<WebhookResult> {
    const actions: string[] = []

    switch (event) {
      case 'message':
        actions.push('Process Slack message')
        break
      case 'reaction':
        actions.push('Process reaction update')
        break
      case 'user_change':
        actions.push('Update user information')
        break
    }

    return {
      success: true,
      message: `Slack webhook processed: ${event}`,
      actions,
      metadata: {
        channel: data.channel?.name,
        user: data.user?.name,
        text: data.text,
      },
    }
  }

  private async handleCustomWebhook(
    event: string,
    data: any,
    timestamp: Date
  ): Promise<WebhookResult> {
    const actions: string[] = ['Process custom webhook']

    return {
      success: true,
      message: `Custom webhook processed: ${event}`,
      actions,
      metadata: {
        event,
        data,
        timestamp,
      },
    }
  }
}

export const webhookHandler = new WebhookHandler()
