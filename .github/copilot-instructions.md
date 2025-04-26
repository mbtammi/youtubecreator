# 🌿 GitHub Copilot Custom Instructions

## 🧠 Coding Style

- Use **minimal and intentional code**: Only add semicolons where syntactically required.
- Always use **single quotes** (`'`) for strings, JSX props, and general code consistency.
- Use **trailing commas** only in multiline structures (arrays, objects, functions) for clarity in diffs.
- Use **tabs** (standard width) for indentation to maintain structure and readability.
- Prefer **arrow functions** (`const MyComponent = () => {}`) over traditional function declarations.
- Structure code to be **easily readable and maintainable**. Avoid clever abstractions or one-liners that trade readability for brevity.
- For React:
  - Stick to **function components** only.
  - Export cleanly like:
    ```tsx
    export default MyComponent;
    ```

### 🧩 TypeScript Support

- Ensure all code is **TypeScript-compatible**, even in plain JS projects.
- In `.tsx` or `.ts` files, always:
  - Use **explicit type annotations**.
  - Define `props` with `interface` or `type`.

---

## 💬 Comments

- Use **brief, insightful comments** only where the logic is non-obvious or edge-case-driven.
- Avoid stating the obvious.

---

## 🧪 Testing

- Do **not generate tests** unless writing within a test-specific file or explicitly asked.

---

## 🎨 Styling & UI Principles

- Style everything with **space and calm in mind**:  
  - Layouts must provide **air** around elements — avoid cluttered UIs.
  - **Whitespace** and **margin** are not just spacing tools, they define flow and elegance.
- Use **TailwindCSS** or clean, scoped **CSS Modules** depending on the project context.

### 🌿 Design Aesthetic

- Use **earthy, calming tones** for default color palettes:  
  - Examples: `bg-stone-100`, `bg-amber-50`, `text-emerald-900`, `border-slate-200`.
- Avoid overly saturated or loud color schemes unless explicitly requested.
- **Limit color palette**: keep the design inviting and warm, not flashy.

### 💡 Visual Quality

- Components should feel **minimal but alive**:
  - Rounded corners (`rounded-2xl` or similar)
  - Subtle shadows (`shadow-md`, `shadow-lg`)
  - Soft hover transitions (`transition-all duration-300 ease-in-out`)
- Use **modern UI conventions** such as:
  - Hover effects for interactive elements
  - Smooth transitions
  - Gradual animations when appropriate
- Ensure **responsiveness** is baked in:
  - Mobile-first layout
  - Use Flex/Grid with `gap-*` and `padding-*` for clear breathing room

---

## 🧱 Architecture

- Stick to a clean project structure:
