import type { SVGProps } from "react"

export function NeuralNetworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Input Layer */}
      <circle cx="4" cy="6" r="1.5" fill="currentColor" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="4" cy="18" r="1.5" fill="currentColor" />

      {/* Hidden Layer */}
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />

      {/* Output Layer */}
      <circle cx="20" cy="8" r="1.5" fill="currentColor" />
      <circle cx="20" cy="16" r="1.5" fill="currentColor" />

      {/* Connections from Input to Hidden */}
      <line x1="5.5" y1="6" x2="10.5" y2="4" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="6" x2="10.5" y2="9" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="6" x2="10.5" y2="14" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="6" x2="10.5" y2="19" stroke="currentColor" strokeOpacity="0.6" />

      <line x1="5.5" y1="12" x2="10.5" y2="4" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="12" x2="10.5" y2="9" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="12" x2="10.5" y2="14" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="12" x2="10.5" y2="19" stroke="currentColor" strokeOpacity="0.6" />

      <line x1="5.5" y1="18" x2="10.5" y2="4" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="18" x2="10.5" y2="9" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="18" x2="10.5" y2="14" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="5.5" y1="18" x2="10.5" y2="19" stroke="currentColor" strokeOpacity="0.6" />

      {/* Connections from Hidden to Output */}
      <line x1="13.5" y1="4" x2="18.5" y2="8" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="13.5" y1="9" x2="18.5" y2="8" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="13.5" y1="14" x2="18.5" y2="8" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="13.5" y1="19" x2="18.5" y2="8" stroke="currentColor" strokeOpacity="0.6" />

      <line x1="13.5" y1="4" x2="18.5" y2="16" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="13.5" y1="9" x2="18.5" y2="16" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="13.5" y1="14" x2="18.5" y2="16" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="13.5" y1="19" x2="18.5" y2="16" stroke="currentColor" strokeOpacity="0.6" />

      {/* Recurrent Connection */}
      <path
        d="M 12 21.5 C 14 21.5 15 23 15 24 C 15 25 14 26.5 12 26.5 C 10 26.5 9 25 9 24 C 9 23 10 21.5 12 21.5"
        stroke="currentColor"
        strokeOpacity="0.8"
        fill="none"
        transform="translate(0, -10)"
      />
    </svg>
  )
}

