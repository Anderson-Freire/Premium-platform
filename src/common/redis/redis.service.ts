import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, RedisClientType } from "redis";
import { parseTTL } from "./redis.constants";
import * as jwt from "jsonwebtoken";
import { json } from "stream/consumers";

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(private config: ConfigService) {}
  private redisclient!: RedisClientType;

  async onModuleInit() {
    this.redisclient = await this.connectToRedis();
  }

  private async connectToRedis(): Promise<RedisClientType> {
    return (await createClient({
      url: this.config.get("REDIS_URL"),
    }).connect()) as RedisClientType;
  }

  async set(key: string, value: string, ttl: string | number) {
    const parsedTtl = parseTTL(ttl);

    return await this.redisclient.set(key, value, { EX: parsedTtl });
  }

  async setWithDaysTTL(key: string, value: string, days: number) {
    const ttlInSeconds = days * 24 * 60 * 60;
    return await this.redisclient.set(key, value, { EX: ttlInSeconds });
  }

  async get(key: string) {
    return await this.redisclient.get(key);
  }

  async getOrSetCache<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: string | number = "10m"
  ): Promise<T> {
    const cached = await this.get(key);
    if (cached) return JSON.parse(cached) as T;

    const freshData = await fetchFn();
    await this.set(key, JSON.stringify(freshData), ttl);
    return freshData;
  }

  async del(key: string) {
    return await this.redisclient.del(key);
  }

  async blacklistToken(token: string, ttl: number) {
    const decoded: any = jwt.decode(token);
    await this.redisclient.set(`blacklist:${token}`, "true", { EX: ttl });
  }

  async isBlackListed(token: string) {
    const value = await this.redisclient.get(`blacklist:${token}`);
    return value === "true";
  }
}
