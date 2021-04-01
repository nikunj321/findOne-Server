const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { issueAccessToken, issueRefreshToken } = require("../utils/accessRefresh");

module.exports = {
    Query: {
        user: () => "hello from user"
    },
    Mutation: {
        login: async (_, { email, password }, { prisma }) => {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (!user) {
                throw new Error('Invalid User/Passowrd');
            }

            const isValid = await compare(password, user.passHash);
            if (!isValid) {
                throw new Error('Invalid User/password');
            }
            const company = await prisma.company.findUnique({
                where: {
                    email
                }
            });

            const payload = {
                id: company.id,
                name: company.name,
            }

            return {
                accessToken: issueAccessToken(payload),
                refreshToken: issueRefreshToken(payload),
            };
        }
    }
}