export type ProjectCategory = 'Web' | 'Java' | 'Cloud' | 'AI' | 'Embedded Systems' | 'Other'

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: ProjectCategory[]
  image?: string
  github?: string
  demo?: string
  featured?: boolean
  developedFor?: string
  overview: string
  problem: string
  solution: string
  keyFeatures: string[]
  visualTone: 'violet' | 'blue' | 'peach' | 'mint'
}

export const projects: Project[] = [
  {
    id: 'focuspilot', title: '[project name]', featured: true, visualTone: 'violet', developedFor: 'Hackathon project',
    description: 'An educational adventure game for children aged 7–14, developed for a hackathon.',
    overview: '[Describe the project.]',
    problem: '[Add the problem or system requirement.]',
    solution: '[ Add the solution or approach taken.]',
    technologies: ['React', 'Vite', 'Node.js', 'Express', 'JavaScript', 'Google Generative AI'],
    category: ['Web', 'AI', 'Other'],
    keyFeatures: ['[Add a verified feature]', '[Add a verified feature]', '[Add a verified feature]'],
  },
  {
    id: 'smart-water-tank', title: '[project name]', featured: true, visualTone: 'blue',
    description: 'An embedded systems project for monitoring water-tank levels through sensors and a display.',
    overview: '[Describe the project.]',
    problem: '[Add the problem or system requirement.]',
    solution: '[ Add the solution or approach taken.]',
    technologies: ['[ Microcontroller]', '[Sensor technology]', '[Display technology]'],
    category: ['Embedded Systems', 'Other'],
    keyFeatures: ['[Add a verified feature]', '[Add a verified feature]', '[Add a verified feature]'],
  },
  {
    id: 'cloud-project', title: '[project name]', featured: true, visualTone: 'mint',
    description: 'Editable placeholder for an AWS or cloud computing project.',
    overview: '[Describe the project.]',
    problem: '[Add the problem or system requirement.]', solution: '[ Add the solution or approach taken.]',
    technologies: ['[AWS service]', '[Cloud technology]', '[Deployment tool]'], category: ['Cloud'],
    keyFeatures: ['[Add a verified feature]', '[Add a verified feature]', '[Add a verified feature]'],
  },
  {
    id: 'java-project', title: '[project name]', visualTone: 'peach',
    description: 'Editable placeholder for a Java, Spring Boot, or MySQL project.',
    overview: '[Describe the project.]',
    problem: '[Add the problem or system requirement.]', solution: '[ Add the solution or approach taken.]',
    technologies: ['Java', 'Spring Boot', 'MySQL', '[Additional technology]'], category: ['Java'],
    keyFeatures: ['[Add a verified feature]', '[Add a verified feature]', '[Add a verified feature]'],
  },
]
