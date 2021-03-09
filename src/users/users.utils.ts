import * as jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {    
    try {
        if (!token) {
            return null;
        }

        const verifiedToken: any = await jwt.verify(token, process.env.PRIVATE_KEY);

        if ("id" in verifiedToken) {
            const user = await client.user.findUnique({ 
                where: { id: verifiedToken["id"] }
            });

            if (user) {
                return user;
            } 
        }

        return null;
    } catch {
        return null;
    }
}

export const protectedResolver = (resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
        return {
            status: false,
            error: "Login user is required."
        }
    }
    return resolver(root, args, context, info);
}

