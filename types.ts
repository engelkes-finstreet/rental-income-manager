import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "db"
import { NextApiRequest } from "next"
import { File } from "multer"

declare module "next" {
  export interface NextApiRequest {
    file: File
  }
}

export type Role = "ADMIN" | "USER"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}

export type ButtonAction = {
  label: string
  onClick: () => void
}
