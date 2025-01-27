import React from 'react'

export function Table({ className = "", children, ...props }) {
  return (
    <table className={`min-w-full divide-y overflow-scroll divide-gray-200 ${className}`} {...props}>
      {children}
    </table>
  )
}

export function TableHeader({ className = "", children, ...props }) {
  return (
    <thead className={`bg-gray-50 ${className}`} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ className = "", children, ...props }) {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({ className = "", children, ...props }) {
  return (
    <tr className={`${className}`} {...props}>
      {children}
    </tr>
  )
}

export function TableHead({ className = "", children, ...props }) {
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`} {...props}>
      {children}
    </th>
  )
}

export function TableCell({ className = "", children, ...props }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
      {children}
    </td>
  )
}