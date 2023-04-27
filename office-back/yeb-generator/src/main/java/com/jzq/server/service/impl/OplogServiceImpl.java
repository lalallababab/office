package com.jzq.server.service.impl;

import com.jzq.server.pojo.Oplog;
import com.jzq.server.mapper.OplogMapper;
import com.jzq.server.service.IOplogService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author seven
 * @since 2023-02-19
 */
@Service
public class OplogServiceImpl extends ServiceImpl<OplogMapper, Oplog> implements IOplogService {

}
