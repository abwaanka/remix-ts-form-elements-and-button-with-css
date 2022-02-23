import * as React from 'react'
import clsx from 'clsx';


import styles from "./form-elements.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}


function Label({className, ...labelProps}: JSX.IntrinsicElements['label']) {
  return (
    <label
      {...labelProps}
      className={clsx(
        'lbl',
        className,
      )}
    />
  )
}

type InputProps =
  | ({type: 'textarea'} & JSX.IntrinsicElements['textarea'])
  | JSX.IntrinsicElements['input']

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref,
) {
  const className = clsx(
    'input',
    props.className,
  )

  if (props.type === 'textarea') {
    return (
      <textarea
        {...(props as JSX.IntrinsicElements['textarea'])}
        className={className}
      />
    )
  }

  return (
    <input
      {...(props as JSX.IntrinsicElements['input'])}
      className={className}
      ref={ref}
    />
  )
})

interface InputErrorProps {
  id: string
  children?: string | null
}

function InputError({children, id}: InputErrorProps) {
  if (!children) {
    return null
  }

  return (
    <p role="alert" id={id} className="input-error">
      {children}
    </p>
  )
}

const Field = React.forwardRef<
  HTMLInputElement,
  {
    defaultValue?: string | null
    name: string
    label: string
    className?: string
    error?: string | null
    description?: React.ReactNode
  } & InputProps
>(function Field(
  {defaultValue, error, name, label, className, description, id, ...props},
  ref,
) {
  const inputId = id ?? `${name}`
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`

  return (
    <div className={clsx('field', className)}>
      <div className="field-label">
        <Label htmlFor={inputId}>{label}</Label>
        {error ? (
          <InputError id={errorId}>{error}</InputError>
        ) : description ? (
          <div id={descriptionId} className="error-description">
            {description}
          </div>
        ) : null}
      </div>

      <Input
        // @ts-expect-error no idea 🤷‍♂️
        ref={ref}
        {...(props as InputProps)}
        name={name}
        id={inputId}
        autoComplete={name}
        required
        defaultValue={defaultValue}
        //more information that the user might need
        aria-describedby={
          error ? errorId : description ? descriptionId : undefined
        }
      />
    </div>
  )
})

function ButtonGroup({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className="button-group">
      {children}
    </div>
  )
}

function ErrorPanel({children, id}: {children: React.ReactNode; id?: string}) {
  return (
    <div role="alert" className="error-panel" id={id}>
      <div className="panel-box" />
      <div className="panel-content">
        {children}
      </div>
    </div>
  )
}

export {Label, Input, InputError, Field, ButtonGroup, ErrorPanel}