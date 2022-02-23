import clsx from 'clsx'
import * as React from 'react'
import { AnchorOrLink } from '~/utils/misc'


import styles from "./button.css";



export function links() {
  return [{ rel: "stylesheet", href: styles }];
}


interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'medium' | 'large'
  children: React.ReactNode | React.ReactNode[]
}

function getClassName({className}: {className?: string}) {
  return clsx(
    'btn',
    className,
  )
}

function ButtonInner({
  children,
  variant,
  size,
}: Pick<ButtonProps, 'children' | 'variant' | 'size'>) {
  return (
    <>
      <div
        className={clsx(
          'btn-inner',
          {
            'btn-secondary-or-danger': variant === 'secondary' || variant === 'danger',
            'danger': variant === 'danger',
            'bg-primary': variant === 'primary',
          },
        )}
      />

      <div
        className={clsx(
          'btn-inner-outer',
          {
            'text-black': variant === 'secondary',
            'text-white': variant === 'primary',
            'text-red': variant === 'danger',
            'large-space': size !== 'medium',
            'medium-space': size === 'medium',
          },
        )}
      >
        {children}
      </div>
    </>
  )
}

function Button({
  children,
  variant = 'primary',
  size = 'large',
  className,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...buttonProps} className={getClassName({className})}>
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </button>
  )
}

function LinkButton({
  className,
  underlined,
  ...buttonProps
}: {underlined?: boolean} & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        underlined
          ? 'underlined'
          : 'underline',
        'link-btn',
      )}
    />
  )
}

const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink(
  {children, variant = 'primary', className, ...rest},
  ref,
) {
  return (
    <AnchorOrLink ref={ref} className={getClassName({className})} {...rest}>
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </AnchorOrLink>
  )
})

export {Button, ButtonLink, LinkButton}