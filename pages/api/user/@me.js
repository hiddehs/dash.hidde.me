import moment from 'moment'
import validateRequest from '../../../lib/auth/api/handler'

export default async (req, res) => {
  validateRequest(req, res)
}

