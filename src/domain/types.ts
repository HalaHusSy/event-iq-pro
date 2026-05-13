export interface RootAccount {
  id: string
  organizationName: string
  contactName: string
  email: string
  createdAt: string
}

export interface EventAdmin {
  id: string
  name: string
  email: string
}

export interface SolutionUseCase {
  id: string
  solutionName: string
  useCases: string[]
}

export interface Exhibitor {
  id: string
  companyName: string
  boothLabel: string
  shortBio: string
  solutions: SolutionUseCase[]
}

export interface LineOaConfig {
  channelId: string
  channelSecret: string
  webhookUrl: string
  linkedAt: string | null
}

export interface ExhibitionEvent {
  id: string
  name: string
  createdAt: string
  admins: EventAdmin[]
  exhibitors: Exhibitor[]
  lineOa: LineOaConfig
}

export interface ExhibitionState {
  rootAccount: RootAccount | null
  events: ExhibitionEvent[]
}
