import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import styles from './Button.module.css'

function SpinnerIcon() {
  return (
    <svg
      className={styles.spinnerSvg}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path
        d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'link'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  skeleton?: boolean
  fullWidth?: boolean
  /** Render icon only — pass accessible label via `aria-label` or as children (visually hidden) */
  iconOnly?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'sm',
      loading = false,
      skeleton = false,
      fullWidth = false,
      iconOnly = false,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    if (skeleton) {
      const skelKey = `skel${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof styles
      const skeletonClasses = [
        styles.skeleton,
        styles[skelKey],
        iconOnly ? styles.skelIconOnly : '',
        fullWidth ? styles.fullWidth : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')
      return <div className={skeletonClasses} role="presentation" aria-hidden="true" />
    }

    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      iconOnly ? styles.iconOnly : '',
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    // In loading state, replace icon slots with spinners.
    // If no icons are present, prepend a spinner so the button always shows one.
    const hasLeading = leadingIcon != null
    const hasTrailing = trailingIcon != null
    const spinnerSlot = (
      <span className={styles.iconSlot} aria-hidden="true">
        <SpinnerIcon />
      </span>
    )

    const effectiveLeading = loading ? spinnerSlot : hasLeading ? (
      <span className={styles.iconSlot} aria-hidden="true">{leadingIcon}</span>
    ) : null

    const effectiveTrailing = loading
      ? (hasTrailing ? spinnerSlot : null)
      : hasTrailing
      ? <span className={styles.iconSlot} aria-hidden="true">{trailingIcon}</span>
      : null

    const content = iconOnly ? (
      <>
        {effectiveLeading}
        {children != null && <span className={styles.srOnly}>{children}</span>}
      </>
    ) : (
      <>
        {/* Show a leading spinner even when no icon was passed, if loading */}
        {loading && !hasLeading && !hasTrailing ? spinnerSlot : effectiveLeading}
        <span className={styles.label}>{children}</span>
        {effectiveTrailing}
      </>
    )

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        <span className={styles.innerContent}>
          {content}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'
