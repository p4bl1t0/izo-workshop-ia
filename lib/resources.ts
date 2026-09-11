export type ResourceGroup = {
  title: string
  items: { name: string; url: string; description?: string }[]
}

export const resourceGroups: ResourceGroup[] = [
  {
    title: 'Modelos y proveedores',
    items: [
      { name: 'OpenAI', url: 'https://openai.com', description: 'GPT, Codex y API de modelos' },
      { name: 'Anthropic', url: 'https://www.anthropic.com', description: 'Claude y Claude Code' },
      { name: 'Google AI', url: 'https://ai.google.dev', description: 'Gemini y documentación para desarrolladores' },
      { name: 'Meta AI', url: 'https://ai.meta.com', description: 'Llama y modelos open source' },
    ],
  },
  {
    title: 'Herramientas de desarrollo',
    items: [
      { name: 'Cursor', url: 'https://cursor.com', description: 'ADE de referencia del workshop: Agent, Rules, Skills, MCP' },
      { name: 'Cursor Docs — Rules', url: 'https://cursor.com/docs/context/rules', description: 'Reglas persistentes para dar forma al agente' },
      { name: 'Cursor Docs — Skills', url: 'https://cursor.com/docs/context/skills', description: 'Procedimientos reutilizables que el agente puede invocar' },
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', description: 'Asistente de código en el IDE' },
      { name: 'Claude Code', url: 'https://docs.anthropic.com/en/docs/claude-code', description: 'Agente de código en terminal' },
      { name: 'OpenAI Codex', url: 'https://openai.com/codex', description: 'Agente de ingeniería de OpenAI' },
      { name: 'Google Gemini Code Assist', url: 'https://codeassist.google', description: 'Asistente de código de Google' },
      { name: 'AGENTS.md', url: 'https://agents.md', description: 'Formato abierto de instrucciones para agentes en un repo' },
    ],
  },
  {
    title: 'MCP',
    items: [
      { name: 'Model Context Protocol', url: 'https://modelcontextprotocol.io', description: 'Documentación oficial del protocolo' },
      { name: 'MCP GitHub', url: 'https://github.com/modelcontextprotocol', description: 'Especificación y servidores de referencia' },
    ],
  },
  {
    title: 'Git',
    items: [
      { name: 'Git Worktree', url: 'https://git-scm.com/docs/git-worktree', description: 'Documentación oficial de worktrees' },
      { name: 'Pro Git — Worktrees', url: 'https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging', description: 'Capítulo de herramientas avanzadas' },
    ],
  },
]
